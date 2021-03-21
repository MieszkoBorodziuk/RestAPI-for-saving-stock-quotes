import { StockQuote } from "../../stock-quotes/entities/stock-quote.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyResponse } from "../dto/company.dto.";

@Entity()
export class Company implements CompanyResponse {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    symbol: string;

    @OneToMany(type => StockQuote, entity => entity.company)
    stockQuote: StockQuote[];
}
