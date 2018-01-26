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

    getStore: function (id) {
        this.store = new Ext.data.JsonStore({
            // store configs
            storeId: 'documentChildrenStore',

            proxy: {
                type: 'ajax',
                url: '',
                reader: {
                    type: 'json',
                    rootProperty: 'dacoments'
                }
            },

            //alternatively, a Model name can be given (see Ext.data.Store for an example)
            fields: [{name: 'id', type: 'int'}, 'title', 'url', {name:'date', type:'date'}]
        });
    },

    getLayout: function()
    {

        if (this.grid == null) {

            this.gridName = "documentSemantics_grid_" + this.item.id;

            this.framePanel = Ext.create('Ext.grid.Panel', {
                //title: 'Children',
                //region: "center",
                //layout: "fit",
                store: this.getStore(this.item.id),
                columns: [
                    { text: 'Name',  dataIndex: 'name', width: 200 },
                    { text: 'Email', dataIndex: 'email', width: 250 },
                    { text: 'Phone', dataIndex: 'phone', width: 120 }
                ],
                listeners: {
                    rowdblclick: function(grid, record, tr, rowIndex, e, eOpts ) {
                        //var data = this.store.getAt(rowIndex);
                        console.log('data');
                        pimcore.helpers.openDocument(2, 'page');
                        console.log(pimcore);

                    }.bind(this)
                }
                //bodyStyle: "-webkit-overflow-scrolling:touch; background:#323232;",

            });

            this.grid = new Ext.Panel({
                title: "Children Grid",
                border: false,
                layout: "fit",
                autoScroll: true,
                closeable: false,
                iconCls: "semantics_icon_documentSemantics",
                items: [this.framePanel]
            });

        }

        return this.grid;
    },

    onClose: function () {
        try {

        } catch (e) { }
    }

});