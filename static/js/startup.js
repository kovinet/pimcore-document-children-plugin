/**
 * startup.js
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md
 * file distributed with this source code.
 *
 * @copyright  Copyright (c) Kovinet, Borut Kovačec s.p. (https://kovinet.eu)
 * @license    https://www.gatherdigital.co.uk/license     GNU General Public License version 3 (GPLv3)
 */
pimcore.registerNS("pimcore.plugin.documentChildrenGrid");

pimcore.plugin.documentChildrenGrid = Class.create(pimcore.plugin.admin, {

    documentSemanticsTabs: {
        docs: {}
    },

    getClassName: function()
    {
        return "pimcore.plugin.documentChildrenGrid";
    },

    initialize: function()
    {
        pimcore.plugin.broker.registerPlugin(this);
    },
 
    pimcoreReady: function(params, broker)
    {
        //
    },

    postOpenDocument: function(doc)
    {
        var semanticsPanel = new pimcore.plugin.documentChildrenGrid.settings(doc);
        doc.tabbar.add(semanticsPanel.getLayout());

        this.documentSemanticsTabs.docs[doc.id] = semanticsPanel;
    }

});

var documentChildrenGridPlugin = new pimcore.plugin.documentChildrenGrid();

