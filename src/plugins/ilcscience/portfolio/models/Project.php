<?php namespace Ilcscience\Portfolio\Models;

use Model;

/**
 * Model
 */
class Project extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;
    
    /**
     * @var string The database table used by the model.
     */
    public $table = 'ilcscience_portfolio_projects';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
