import { applyDecorators } from '@nestjs/common';

export function Authorized() {
    return applyDecorators();
}