<?php namespace Ilcscience\Portfolio\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateIlcsciencePortfolioProjects2 extends Migration
{
    public function up()
    {
        Schema::table('ilcscience_portfolio_projects', function($table)
        {
            $table->text('description')->nullable()->change();
            $table->string('short_description', 255)->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('ilcscience_portfolio_projects', function($table)
        {
            $table->text('description')->nullable(false)->change();
            $table->string('short_description', 255)->nullable(false)->change();
        });
    }
}
