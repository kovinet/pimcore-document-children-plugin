/**
 * startup.js
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md
 * file distributed with this source code.
 *
 * @copyright  Copyright (c) Kovinet, Borut Kovačec s.p. (https://kovinet.eu)
 * @license    https://kovinet.eu/license     GNU General Public License version 3 (GPLv3)
 */
pimcore.registerNS("pimcore.plugin.documentChildrenGrid");

pimcore.plugin.documentChildrenGrid = Class.create(pimcore.plugin.admin, {

    documentChildrenTabs: {
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
        var childrenPanel = new pimcore.plugin.documentChildrenGrid.settings(doc);
        doc.tabbar.add(childrenPanel.getLayout());

        this.documentChildrenTabs.docs[doc.id] = childrenPanel;
        //childrenPanel.reload();
    }

});

var documentChildrenGridPlugin = new pimcore.plugin.documentChildrenGrid();

