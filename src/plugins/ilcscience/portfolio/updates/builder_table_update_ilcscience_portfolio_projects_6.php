<?php namespace Ilcscience\Portfolio\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateIlcsciencePortfolioProjects6 extends Migration
{
    public function up()
    {
        Schema::table('ilcscience_portfolio_projects', function($table)
        {
            $table->integer('sort_order')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('ilcscience_portfolio_projects', function($table)
        {
            $table->integer('sort_order')->nullable(false)->change();
        });
    }
}
