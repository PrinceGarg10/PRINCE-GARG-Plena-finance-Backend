import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { ApplicationModule } from './modules/app.module';
/**
 * These are API defaults that can be changed using environment variables,
 * it is not required to change them (see the `.env.example` file)
 */
const API_DEFAULT_PORT = 3000;
const API_DEFAULT_PREFIX = '/api/aps/';

/**
 * The defaults below are dedicated to Swagger configuration, change them
 * following your needs (change at least the title & description).
 *
 * @todo Change the constants below following your API requirements
 */


/**
 * Register a Swagger module in the NestJS application.
 * This method mutates the given `app` to register a new module dedicated to
 * Swagger API documentation. Any request performed on `SWAGGER_PREFIX` will
 * receive a documentation page as response.
 *
 * @todo See the `nestjs/swagger` NPM package documentation to customize the
 *       code below with API keys, security requirements, tags and more.
 */

/**
 * Build & bootstrap the NestJS API.
 * This method is the starting point of the API; it registers the application
 * module and registers essential components such as the logger and request
 * parsing middleware.
 */
async function bootstrap(): Promise<void> {

    const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
    app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);

    app.use(json({ limit: '50mb' }));
    app.enableCors({
        origin: '*'
    })

    await app.listen(process.env.API_PORT || API_DEFAULT_PORT).then(() => {
        console.log("")
        console.log("✓ Server started at : " + (process.env.API_PORT || API_DEFAULT_PORT))
        console.log("")
    });
}

/**
 * It is now time to turn the lights on!
 * Any major error that can not be handled by NestJS will be caught in the code
 * below. The default behavior is to display the error on stdout and quit.
 *
 * @todo It is often advised to enhance the code below with an exception-catching
 *       service for better error handling in production environments.
 */
bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});
