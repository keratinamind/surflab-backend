module.exports = (sequelize, DataTypes) => {
  const Dealcategory = sequelize.define(
    "Dealcategory",
    {
      image: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      tableName: "dealcategory",
      underscored: true,
    }
  );
    Dealcategory.associate = (models) => {
        Dealcategory.hasMany(models.Dealdetail, {
            foreignKey: {
                name: "categoryId",
                allowNull: false
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        })
    };
  return Dealcategory;
};
