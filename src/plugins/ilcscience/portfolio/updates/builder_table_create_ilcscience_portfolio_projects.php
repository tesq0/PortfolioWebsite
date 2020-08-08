<?php namespace Ilcscience\Portfolio\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateIlcsciencePortfolioProjects extends Migration
{
    public function up()
    {
        Schema::create('ilcscience_portfolio_projects', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('title');
            $table->text('description');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('ilcscience_portfolio_projects');
    }
}
