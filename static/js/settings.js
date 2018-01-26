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

            this.store = new Ext.data.JsonStore({
                autoDestroy: true,
                //autoLoad: true,
                storeId: 'documentChildrenStore',
                proxy: {
                    type: 'ajax',
                    url: '/plugin/DocumentChildrenGrid/index/get',
                    extraParams: {
                        documentId: this.item.id
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'documents'
                    }
                },
                fields: [{name: 'id', type: 'int'}, 'title', 'url', {name:'date', type:'date'}]
            });

            console.log('inited store');

            //this.gridName = "documentSemantics_grid_" + this.item.id;
            this.gridPanel = Ext.create('Ext.grid.Panel', {
                //title: 'Children', //no need
                store: this.store,
                columns: [
                    { text: 'Title',  dataIndex: 'title', width: 400 },
                    { text: 'Date', dataIndex: 'date', width: 100 }
                ],
                listeners: {
                    rowdblclick: function(grid, record, tr, rowIndex, e, eOpts ) {
                        console.log('record', record);
                        console.log('tr', tr);
                        console.log('rowIndex', rowIndex);
                        console.log('e', e);

                        //var data = this.store.getAt(rowIndex);
                        console.log('data');
                        pimcore.helpers.openDocument(record.id, 'page');
                        console.log(pimcore);

                    }.bind(this)
                }
            });

            this.gridPanel.on("beforerender", function () {
                this.store.load();
            }.bind(this));

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

    reload: function () {
        this.store.load();
    },

    onClose: function () {
        try {

        } catch (e) { }
    }

});