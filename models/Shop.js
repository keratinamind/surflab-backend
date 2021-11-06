module.exports = (sequelize , DataTypes) => {
    const Shop = sequelize.define(
        "Shop", {
            avatar: DataTypes.STRING,
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
  
        },
        {
            tableName: "shops",
            underscored: true,
        }
    );
    Shop.associate = (models) => {
        Shop.hasMany(models.Dealdetail, {
            foreignKey: {
                name: "shopId",
                allowNull: false
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        })
    }
    return Shop;
}