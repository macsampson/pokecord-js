module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_item', {
        user_id: DataTypes.STRING,
        name: DataTypes.STRING,
        item_id: DataTypes.STRING,
        desc: DataTypes.STRING,
        rarity: DataTypes.STRING,
        artist: DataTypes.STRING,
        set_name: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.FLOAT,
        date_pulled: DataTypes.STRING,
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            'default': 0,
        },
    }, {
        timestamps: false,
    });
};