import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../utils/hashService';
import { LoginInput } from './dto/login-request.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    async login(loginInput: LoginInput) {
        return await this.loginUsingCredentials(loginInput);
    }

    async generateLoginTokens(payload: any) {
        if (payload) {
            const accessToken = this.jwtService.sign(payload.tokenDetails);
            const refreshToken = this.jwtService.sign({ id: payload.tokenDetails.id }, { expiresIn: '30d' });
            return {
                token: accessToken,
                refreshToken,
                loginDetails: payload.user,
            }
        }
    }

    async loginUsingCredentials(loginInput: any) {
        let user
        if (loginInput.rtoken) {
            const tokenInfo = await this.jwtService.verifyAsync(loginInput.rtoken)
            if (tokenInfo && tokenInfo.id) {
                user = await this.userService.findOneByQueryForLogin({ _id: tokenInfo.id })
            }
        } else {
            user = await this.userService.findOneByQueryForLogin({
                $or: [
                    {
                        username: loginInput.username,
                    },
                    {
                        contact: loginInput.username,
                    }
                ],
                isBlocked: { $ne: true }
            });
        }


        if (user) {
            if (loginInput.rtoken) {
                return await this.generateLoginTokens({
                    tokenDetails: {
                        id: user._id,
                        sub: user.password,
                    },
                    user: user
                });
            }
            else {

                const isvalidated = await HashService.validateHash(
                    loginInput.password,
                    user.password,
                );
                //two verfication not enabled then login directly
                if (isvalidated) {
                    return await this.generateLoginTokens({
                        tokenDetails: {
                            id: user._id,
                            sub: user.password,
                        },
                        user: user
                    });
                } else {
                    throw new BadRequestException(
                        'Password is incorrect'
                    );
                }
            }
        }
        throw new BadRequestException('User not found');
    }

    async verifyTokenReturnUser(token: string): Promise<any> {
        let tokenDetails
        try {
            tokenDetails = await this.jwtService.verify(token)

        } catch (e) {
            throw new UnauthorizedException(e)
        }

        const findUser = await this.userService.findOneByQueryForLogin({ _id: tokenDetails.id })
        if (!findUser?.isBlocked) {
            return findUser
        }
        throw new UnauthorizedException("User inactive")

    }
}
