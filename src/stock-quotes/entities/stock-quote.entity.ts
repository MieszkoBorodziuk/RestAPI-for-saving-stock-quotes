import { Company } from "../../company/entities/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { StockQuotesResponse } from "../dto/stockQuotes.dto";

@Entity()
@Unique(['company', 'date'])
export class StockQuote implements StockQuotesResponse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'float',
        scale: 2,
    })
    price: number;

    @Column()
    date: Date;

    @ManyToOne(type => Company, entity => entity.stockQuote)
    @JoinColumn()
    company: Company;
}
