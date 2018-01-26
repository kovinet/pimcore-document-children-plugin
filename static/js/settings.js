/**
 * documentSemantics.js
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md
 * file distributed with this source code.
 *
 * @copyright  Copyright (c) 2014-2016 Gather Digital Ltd (https://www.gatherdigital.co.uk)
 * @license    https://www.gatherdigital.co.uk/license     GNU General Public License version 3 (GPLv3)
 */
pimcore.registerNS("pimcore.plugin.documentChildrenGrid.settings");
pimcore.plugin.documentChildrenGrid.settings = Class.create({

    initialize: function(item)
    {
        this.item = item;
    },

    getLayout: function()
    {
        if (this.layout == null) {

            this.store = Ext.data.JsonStore({
                autoDestroy: true,
                storeId: 'documentChildrenStore',
                proxy: {
                    type: 'ajax',
                    url: '/plugins/document-children-grid/index/get',
                    extraParams: {
                        id: this.item.id
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'dacoments'
                    }
                },
                fields: [{name: 'id', type: 'int'}, 'title', 'url', {name:'date', type:'date'}]
            });

            //this.gridName = "documentSemantics_grid_" + this.item.id;
            this.gridPanel = Ext.create('Ext.grid.Panel', {
                //title: 'Children', //no need
                store: this.store,
                columns: [
                    { text: 'Title',  dataIndex: 'name', width: 200 },
                    { text: 'Date', dataIndex: 'email', width: 250 }
                ],
                listeners: {
                    rowdblclick: function(grid, record, tr, rowIndex, e, eOpts ) {
                        //var data = this.store.getAt(rowIndex);
                        console.log('data');
                        pimcore.helpers.openDocument(2, 'page');
                        console.log(pimcore);

                    }.bind(this)
                }
            });

            this.layout = new Ext.Panel({
                title: "Children Grid",
                border: false,
                layout: "fit",
                autoScroll: true,
                closeable: false,
                iconCls: "pimcore_icon_search",
                items: [this.gridPanel]
            });

        }

        return this.layout;
    },

    onClose: function () {
        try {

        } catch (e) { }
    }

});