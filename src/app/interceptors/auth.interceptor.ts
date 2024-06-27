import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authRequest = req.clone({
    headers: req.headers.set(
      'Authorization',
      `Bearer ${sessionStorage.getItem('access_token')}`
    ),
  });

  return next(authRequest);
};
