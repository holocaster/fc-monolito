import { BelongsTo, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
    tableName: "productsInvoice",
    timestamps: false,
})
export class ProductInvoiceModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;
    
    @BelongsTo(() => InvoiceModel, { foreignKey: 'invoice_id' })
    Invoice: InvoiceModel[];

    @Column({ allowNull: true })
    createdAt: Date;

    @Column({ allowNull: true })
    updatedAt: Date;
}