import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('localhost') && sessionStorage.getItem('access_token')) {
    const authRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${sessionStorage.getItem('access_token')}`
      ),
    });
    return next(authRequest);
  } else {
    return next(req);
  }
};
