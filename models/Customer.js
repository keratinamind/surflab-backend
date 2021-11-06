module.exports = (sequelize , DataTypes) => {
    const Customer = sequelize.define(
        "Customer", {
            avatar: DataTypes.STRING,
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            address: DataTypes.STRING,
            age: DataTypes.STRING,
            role: {
                type: DataTypes.STRING,
                defaultValue: 'customer',
                allowNull: false
            }
  
        },
        {
            tableName: "customers",
            underscored: true,
        }
    );
    Customer.associate = (models) => {
        Customer.hasMany(models.Dealbooking, {
            foreignKey: {
                name: "customerId",
                allowNull: false
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        })
    }
    return Customer;
}