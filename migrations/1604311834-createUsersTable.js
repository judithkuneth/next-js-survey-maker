exports.up = async (sql) => {
  await sql`CREATE TABLE IF NOT EXISTS users (
		id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
		username varchar(40),
		created_at TIMESTAMPTZ DEFAULT Now(),
  password_hash varchar(100))`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE if EXISTS users`;
};
