// Type definitions for alkkis*
// Project: https://github.com/miksaraj/alkkis.*
// Definitions by: Mikko Rajakangas <https://github.com/miksaraj>

export const AlcoholMetabolismRate = 0.017

export const AlcoholToGramsMultiplier = 0.7892

export type BacValue = number

export enum Gender {
    Female = 1,
    Male = 2
}

export enum GenderMultiplier {
    Male = 0.68,
    Female = 0.55
}

export interface GenderView {
    value: Gender,
    text: string
}

export interface Drinker {
    gender: Gender,
    weight: number,
    time: number
}

export interface Product {
    _id: string
    num: number,
    name: string,
    maker: string,
    bottleSize: string,
    price: number,
    litrePrice: number,
    type: string,
    subtype?: string,
    beerType?: string
    country: string,
    area?: string,
    year?: string
    character?: string,
    alcoholPercentage: number,
    energy: number,
    alkoLink: string
}

export interface BacRepresentation {
    text: string
}

export interface BacRequestDto {
    products: Product[],
    drinker: Drinker
}