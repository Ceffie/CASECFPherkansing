import { CursusInstantie } from "./CursusInstantie";

export interface Cursus {
    id: number,
    titel: string,
    code: string,
    duur: number,
    cursusInstanties: Array<CursusInstantie>
}