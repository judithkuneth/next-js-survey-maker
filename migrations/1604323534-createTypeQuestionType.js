exports.up = async (sql) => {
  await sql`
	CREATE TYPE question_type AS ENUM('x_slider',
    'y_slider',
    'gauge',
    'binary')`;
};

exports.down = async (sql) => {
  await sql`
	DROP TYPE question_type`;
};
