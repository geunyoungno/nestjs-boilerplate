import { applyDecorators, SetMetadata } from '@nestjs/common';

// SECTION - 인증 여부
export const IS_PROTECT_KEY = Symbol('isProtect');
export const Protect = () => SetMetadata(IS_PROTECT_KEY, true);

export const IS_PUBLIC_KEY = Symbol('isPublic');
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
// !SECTION

// SECTION - external
export const IS_EXTERNAL_KEY = Symbol('isExternal');
export const External = () => SetMetadata(IS_EXTERNAL_KEY, true);

export const PublicExternal = () => applyDecorators(External(), Public());
export const ProtectExternal = () => applyDecorators(External(), Protect());
// !SECTION

// SECTION - platform
export const IS_PLATFORM_KEY = Symbol('isPlatform');
export const Platform = () => SetMetadata(IS_PLATFORM_KEY, true);

export const ProtectPlatform = () => applyDecorators(Platform(), Protect());
export const PublicPlatform = () => applyDecorators(Platform(), Public());
// !SECTION

// SECTION - common
export const IS_COMMON_MASHUP_KEY = Symbol('isCommonMashup');
export const CommonMashup = () => applyDecorators(SetMetadata(IS_COMMON_MASHUP_KEY, true), Public());
// !SECTION
