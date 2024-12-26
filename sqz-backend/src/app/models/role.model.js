module.exports = (sequelize, Sequelize, DataTypes) => {
    const Role = sequelize.define(
      "role",
      {
        roleName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notNull: { msg: "Role name is required" },
            notEmpty: { msg: "Role name is required" },
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          validate: {
            notNull: { msg: "isActive field is required" },
          },
        },
      },
      {
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  
    return Role;
  };
  