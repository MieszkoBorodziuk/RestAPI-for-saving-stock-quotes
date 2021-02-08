import { StockQuote } from "../../stock-quotes/entities/stock-quote.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyInterface } from "../interfaces/company";

@Entity()
export class Company implements CompanyInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    symbol: string;

    @OneToMany(type => StockQuote, entity => entity.company)
    stockQuote: StockQuote[];
}
