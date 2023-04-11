import { BelongsTo, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";

@Table({
    tableName: "procutsOrder",
    timestamps: false,
})
export class ProductOrderModel extends Model {
    @PrimaryKey
    @Column
    procutId: string;

    @Column({ allowNull: false })
    price: number;

    @Column({ allowNull: false })
    name: string;
    
    @BelongsTo(() => OrderModel, { foreignKey: 'order_id' })
    order: OrderModel[];
}