import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function createCorsOptions(rawOrigins: string): CorsOptions {
  const allowedOrigins = rawOrigins
    ? rawOrigins
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
    : [];

  return {
    origin:
      allowedOrigins.length > 0
        ? (requestOrigin, callback) => {
            if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
              callback(null, true);
            } else {
              callback(new Error(`CORS policy violation: ${requestOrigin}`));
            }
          }
        : true, // allow all if no origins are defined
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  };
}
