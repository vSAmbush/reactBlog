<?php

use yii\db\Migration;

/**
 * Class m201004_124829_create_posts
 */
class m201004_124829_create_posts extends Migration
{
    const TABLE_NAME = 'posts';

    /*public function safeUp()
    {

    }

    public function safeDown()
    {
        echo "m201004_124829_create_posts cannot be reverted.\n";

        return false;
    }*/


    /**
     * {@inheritdoc}
     */
    public function up()
    {
        $this->createTable(self::TABLE_NAME, [
            'id' => $this->primaryKey(),
            'title' => $this->text()->notNull(),
            'description' => $this->text()->notNull(),
            'tag' => $this->string(64)->notNull(),
            'created_at' => $this->bigInteger()->notNull()
        ]);

        $this->batchInsert(self::TABLE_NAME, ['title', 'description', 'tag', 'created_at'], [
            ['First Post', 'some description v1', 'aa', 1601633642],
            ['Second Post', 'some description v2', 'ab', 1601813480],
            ['Third Post', 'some description v3', 'aa', 1601735523],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function down()
    {
        $this->dropTable(self::TABLE_NAME);
    }

}
