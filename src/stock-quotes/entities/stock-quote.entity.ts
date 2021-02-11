import { Company } from "../../company/entities/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StockQutesResponse } from "../interfaces/stockQuotes";

@Entity()
export class StockQuote implements StockQutesResponse{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
        type: 'float',
        scale: 2,
    })
    openPrice: number;

    @Column({
        type: 'float',
        scale: 2,
    })
    highPrice: number;

    @Column({
        type: 'float',
        scale: 2,
    })
    lowPrice: number;

    @Column({
        type: 'float',
        scale: 2,
    })
    closePrice: number;

    @Column()
    date: Date;

    @ManyToOne(type => Company, entity => entity.stockQuote)
    @JoinColumn()
    company: Company;
}
