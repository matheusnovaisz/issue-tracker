import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

//passing the strategy name directly to the AuthGuard() introduces magic strings in the codebase.
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
