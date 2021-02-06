import { Column, PrimaryGeneratedColumn } from "typeorm";
import { CompanyInterface } from "../interfaces/company";


export class Company implements CompanyInterface {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;
    
    @Column()
    symbol: string;
}
