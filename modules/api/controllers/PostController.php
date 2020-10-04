<?php

namespace app\modules\api\controllers;

use app\modules\api\models\Post;
use yii\filters\Cors;
use yii\rest\ActiveController;

class PostController extends ActiveController
{
    public $modelClass = Post::class;

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $auth = $behaviors['authenticator'];
        unset($behaviors['authenticator']);

        $behaviors['corsFilter'] = [
            'class' => Cors::class
        ];

        $behaviors['authenticator'] = $auth;

        return $behaviors;
    }
}