import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParsedMultipartData = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.parsedData;
});
