import { StockQuote } from "../../stock-quotes/entities/stock-quote.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyResponse } from "../interfaces/company";

@Entity()
export class Company implements CompanyResponse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    symbol: string;

    @OneToMany(type => StockQuote, entity => entity.company)
    stockQuote: StockQuote[];
}
