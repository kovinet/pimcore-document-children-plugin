<?php

/**
 * Plugin
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md
 * file distributed with this source code.
 *
 * @copyright  Copyright (c) KoviNET, Borut Kovačec s.p. (http://kovinet.eu)
 * @license    https://kovinet.eu/license     GNU General Public License version 3 (GPLv3)
 */

namespace DocumentChildrenGrid;

use Pimcore\API\Plugin as PluginLib;

class Plugin extends PluginLib\AbstractPlugin implements PluginLib\PluginInterface
{

    public function init()
    {
        parent::init();

        if (!self::isInstalled()) {
            return;
        }
    }

    public static function install()
    {

        return 'DocumentChildrenGrid Installed Successfully!';
    }

    public static function uninstall()
    {

        return 'DocumentChildrenGrid Uninstalled Successfully!';
    }

    public static function isInstalled()
    {
        //@todo implement!
        return true;
    }



}
