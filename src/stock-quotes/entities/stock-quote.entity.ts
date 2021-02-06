import { Column, PrimaryGeneratedColumn } from "typeorm";
import { StockQutesInterface } from "../interfaces/stockQuotes";


export class StockQuote implements StockQutesInterface{
    @PrimaryGeneratedColumn('uuid')
    id: number;

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
}
