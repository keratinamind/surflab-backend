

module.exports = (sequelize , DataTypes) => {
    const Dealdetail = sequelize.define(
        "Dealdetail", {
            image: DataTypes.STRING,
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            detail: DataTypes.STRING(10000),
            expireDate: DataTypes.DATE,
            quantity: DataTypes.INTEGER,
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
              },

            remain: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
            
            
  
        },
        {
            tableName: "dealdetail",
            underscored: true,
        }
    );
    Dealdetail.associate = (models) => {
        Dealdetail.hasMany(models.Dealbooking, {
            foreignKey: {
                name: "dealId",
                allowNull: false
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        })
        Dealdetail.belongsTo(models.Shop, {
            foreignKey: {
                name: "shopId",
                allowNull: false
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        })
        
    }
    
    return Dealdetail;
}