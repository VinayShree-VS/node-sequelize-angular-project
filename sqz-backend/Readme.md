sequelize create DB --> npx sequelize-cli db:create
sequelize migrate DB --> npx sequelize-cli db:migrate
sequelize single table migrate --> npx sequelize-cli migration:generate --name enter-table-name


1. Set up Sequelize CLI:
    npm install sequelize sequelize-cli

2. Initialize Sequelize:
    npx sequelize-cli init

3. Create a Migration:
    npx sequelize-cli migration:generate --name create-user-table

4. Run the Migration:
    npx sequelize-cli db:migrate

5. Reverse Migration (Rollback):
    If you want to undo the last migration, you can roll it back with:- npx sequelize-cli db:migrate:undo
    To undo all migrations, you can run:- npx sequelize-cli db:migrate:undo:all

6. Check the Status:
    This will show you which migrations have been applied and which are pending.
    npx sequelize-cli db:migrate:status