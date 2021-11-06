module.exports = (sequelize , DataTypes) => {
    const Dealbooking = sequelize.define(
        "Dealbooking", {
            
            expiredate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            voucherId: {
                type: DataTypes.STRING,
                allowNull : false
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            paymentstatus: DataTypes.BOOLEAN,
            isUsed: DataTypes.BOOLEAN,
            totalAmount: DataTypes.INTEGER
            
  
        },
        {
            tableName: "dealbooking",
            underscored: true,
        }
        
    );
    Dealbooking.associate = (models) => {
        Dealbooking.belongsTo(models.Dealdetail, {
            foreignKey: {
                name: "dealId",
                allowNull: false
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        })
        
    }
    return Dealbooking;
}