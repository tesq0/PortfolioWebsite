<?php namespace Ilcscience\Portfolio\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateIlcsciencePortfolioProjects4 extends Migration
{
    public function up()
    {
        Schema::table('ilcscience_portfolio_projects', function($table)
        {
            $table->string('thumbnail')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('ilcscience_portfolio_projects', function($table)
        {
            $table->dropColumn('thumbnail');
        });
    }
}
