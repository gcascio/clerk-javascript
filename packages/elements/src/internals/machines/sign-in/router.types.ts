import type { SignInResource } from '@clerk/types';
import type { AnyActorLogic, MachineSnapshot } from 'xstate';

import type {
  BaseRouterContext,
  BaseRouterErrorEvent,
  BaseRouterInput,
  BaseRouterLoadingEvent,
  BaseRouterNextEvent,
  BaseRouterPrevEvent,
  BaseRouterRedirectEvent,
  BaseRouterRouteRegisterEvent,
  BaseRouterRouteUnregisterEvent,
  BaseRouterSetClerkEvent,
  BaseRouterStartEvent,
  BaseRouterTransferEvent,
} from '~/internals/machines/types';

import type { SignInVerificationFactorUpdateEvent } from './verification.types';

// ---------------------------------- Tags ---------------------------------- //

export const SignInRouterRoutes = {
  start: 'route:start',
  firstFactor: 'route:first-factor',
  secondFactor: 'route:second-factor',
  callback: 'route:callback',
  error: 'route:error',
  forgotPassword: 'route:forgot-password',
  resetPassword: 'route:reset-password',
  chooseStrategy: 'route:choose-strategy',
} as const;

export type SignInRouterRoutes = keyof typeof SignInRouterRoutes;
export type SignInRouterTags = (typeof SignInRouterRoutes)[keyof typeof SignInRouterRoutes];

// ---------------------------------- Children ---------------------------------- //

export const SignInRouterSystemId = {
  start: 'start',
  firstFactor: 'firstFactor',
  secondFactor: 'secondFactor',
  resetPassword: 'resetPassword',
} as const;

export type SignInRouterSystemId = keyof typeof SignInRouterSystemId;

// ---------------------------------- Events ---------------------------------- //

export type SignInRouterNextEvent = BaseRouterNextEvent<SignInResource>;
export type SignInRouterStartEvent = BaseRouterStartEvent;
export type SignInRouterPrevEvent = BaseRouterPrevEvent;
export type SignInRouterChooseStrategyEvent = { type: 'NAVIGATE.CHOOSE_STRATEGY' };
export type SignInRouterForgotPasswordEvent = { type: 'NAVIGATE.FORGOT_PASSWORD' };
export type SignInRouterErrorEvent = BaseRouterErrorEvent;
export type SignInRouterTransferEvent = BaseRouterTransferEvent;
export type SignInRouterRedirectEvent = BaseRouterRedirectEvent;
export type SignInRouterLoadingEvent = BaseRouterLoadingEvent<'start' | 'verifications' | 'reset-password'>;
export type SignInRouterSetClerkEvent = BaseRouterSetClerkEvent;
export type SignInRouterSubmitEvent = { type: 'SUBMIT' };

export interface SignInRouterInitEvent extends BaseRouterInput {
  type: 'INIT';
  signUpPath?: string;
}

export type SignInRouterRouteRegisterEvent<TLogic extends AnyActorLogic = AnyActorLogic> = BaseRouterRouteRegisterEvent<
  SignInRouterSystemId,
  TLogic
>;
export type SignInRouterRouteUnregisterEvent = BaseRouterRouteUnregisterEvent<SignInRouterSystemId>;

export type SignInRouterRouteEvents = SignInRouterRouteRegisterEvent | SignInRouterRouteUnregisterEvent;

export type SignInRouterNavigationEvents =
  | SignInRouterStartEvent
  | SignInRouterChooseStrategyEvent
  | SignInRouterForgotPasswordEvent
  | SignInRouterPrevEvent;

export type SignInRouterEvents =
  | SignInRouterInitEvent
  | SignInRouterNextEvent
  | SignInRouterNavigationEvents
  | SignInRouterErrorEvent
  | SignInRouterTransferEvent
  | SignInRouterRouteEvents
  | SignInRouterRedirectEvent
  | SignInVerificationFactorUpdateEvent
  | SignInRouterLoadingEvent
  | SignInRouterSetClerkEvent
  | SignInRouterSubmitEvent;

// ---------------------------------- Context ---------------------------------- //

export type SignInRouterLoadingContext = Omit<SignInRouterLoadingEvent, 'type'>;

export interface SignInRouterContext extends BaseRouterContext {
  signUpPath: string;
  loading: SignInRouterLoadingContext;
}

// ---------------------------------- Schema ---------------------------------- //

export interface SignInRouterSchema {
  context: SignInRouterContext;
  events: SignInRouterEvents;
  tags: SignInRouterTags;
}

// ---------------------------------- Schema ---------------------------------- //

export type SignInChildren = any; // TODO: Update
export type SignInOuptut = any; // TODO: Update
export type SignInStateValue = any; // TODO: Update

export type SignInRouterSnapshot = MachineSnapshot<
  SignInRouterContext,
  SignInRouterEvents,
  SignInChildren,
  SignInStateValue,
  SignInRouterTags,
  SignInOuptut
>;
