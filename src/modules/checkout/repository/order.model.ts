import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductOrderModel } from "./product-order.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    status: string;

    @Column({ allowNull: false })
    clientId: string;

    @Column({ allowNull: false })
    clientName: string;

    @HasMany(() => ProductOrderModel,{ foreignKey: 'order_id'})
    products: ProductOrderModel[];

    @Column({ allowNull: true })
    createdAt: Date;

    @Column({ allowNull: true })
    updatedAt: Date;
}
