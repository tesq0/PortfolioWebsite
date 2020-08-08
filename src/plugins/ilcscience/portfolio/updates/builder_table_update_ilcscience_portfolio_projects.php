<?php namespace Ilcscience\Portfolio\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateIlcsciencePortfolioProjects extends Migration
{
    public function up()
    {
        Schema::table('ilcscience_portfolio_projects', function($table)
        {
            $table->string('short_description');
        });
    }
    
    public function down()
    {
        Schema::table('ilcscience_portfolio_projects', function($table)
        {
            $table->dropColumn('short_description');
        });
    }
}
