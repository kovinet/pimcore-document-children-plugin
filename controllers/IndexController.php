<?php
/**
 * IndexController
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md
 * file distributed with this source code.
 *
 * @copyright  Copyright (c) KoviNET, Borut Kovačec s.p. (http://kovinet.eu)
 * @license    https://kovinet.eu/license     GNU General Public License version 3 (GPLv3)
 */

use Pimcore\Model\Document;

class DocumentChildrenGrid_IndexController extends \Pimcore\Controller\Action\Admin
{
    /**
     * @var int $documentId
     */
    protected $documentId;

    /**
     * @var Document $document
     */
    protected $document;

    /**
     * Handle the item
     */
    public function preDispatch()
    {
        parent::preDispatch();

        $this->disableViewAutoRender();

        $this->documentId  = (int) $this->getParam('documentId', 0);
        $this->document = Document::getById($this->documentId);

        if (!$this->document) {
            throw new \Exception('Document was not found');
        }
    }

    /**
     * Output document children in JSON
     */
    public function getAction()
    {
        $isAdmin = \Pimcore\Tool\Authentication::authenticateSession();

        //only alow if valid admin session active
        if (!$isAdmin) {
            throw new \Exception('Login required');
        }

        $list = new Document\Listing();
        $list->setCondition('parentId = ? AND `type` = "page"', $this->documentId);
        $list->setOrderKey('index');
        $list->setOrder('asc');

        $children = [];
        foreach ($list as $item) {
            $dateEl = $item->getElement('date');
            $date = null;
            if ($dateEl && ($data = $dateEl->getData()) && $data instanceof \Carbon\Carbon) {
                $date = $dateEl->getData()->format('Y-m-d');
            }
            $children[] = [
                'id' => $item->getId(),
                'title' => $item->getTitle(),
                'date' => $date
            ];
        }

        echo json_encode(['documents' => $children]);

    }


}
