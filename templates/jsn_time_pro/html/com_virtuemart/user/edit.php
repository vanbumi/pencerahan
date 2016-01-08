<?php
/**
*
* Modify user form view
*
* @package	VirtueMart
* @subpackage User
* @author Oscar van Eijk
* @link http://www.virtuemart.net
* @copyright Copyright (c) 2004 - 2010 VirtueMart Team. All rights reserved.
* @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
* VirtueMart is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* @version $Id: edit.php 8221 2014-08-20 23:23:26Z Milbo $
*/

// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die('Restricted access');

// Implement Joomla's form validation
JHtml::_('behavior.formvalidation');
JHtml::stylesheet('vmpanels.css', JURI::root().'components/com_virtuemart/assets/css/'); // VM_THEMEURL
?>
<style type="text/css">
	.invalid {
		border-color: #f00;
		background-color: #ffd;
		color: #000;
	}
	label.invalid {
		background-color: #fff;
		color: #f00;
	}
</style>
<script language="javascript">
	function myValidator(f, t)
	{
		f.task.value=t;
		if (document.formvalidator.isValid(f)) {
			f.submit();
			return true;
		} else {
			var msg = '<?php echo addslashes( vmText::_('COM_VIRTUEMART_USER_FORM_MISSING_REQUIRED_JS') ); ?>';
			alert (msg);
		}
		return false;
	}
</script>
<h1 class="category-title"><span><?php echo $this->page_title ?></span></h1>
<?php echo shopFunctionsF::getLoginForm(false); ?>

<?php if($this->userDetails->virtuemart_user_id==0) {
	echo '<h1 class="category-title register-title"><span>'.vmText::_('COM_VIRTUEMART_YOUR_ACCOUNT_REG').'</span></h1>';
}?>
<form method="post" id="adminForm" name="userForm" action="<?php echo JRoute::_('index.php?option=com_virtuemart&view=user',$this->useXHTML,$this->useSSL) ?>" class="form-validate">

<?php // Loading Templates in Tabs
if($this->userDetails->virtuemart_user_id!=0) {
	$tabarray = array();
	if($this->userDetails->user_is_vendor){
		if(!empty($this->add_product_link)) {
			echo $this->add_product_link;
		}
		$tabarray['vendor'] = 'COM_VIRTUEMART_VENDOR';
	}
	$tabarray['shopper'] = 'COM_VIRTUEMART_SHOPPER_FORM_LBL';
    //$tabarray['user'] = 'COM_VIRTUEMART_USER_FORM_TAB_GENERALINFO';
	if (!empty($this->shipto)) {
		$tabarray['shipto'] = 'COM_VIRTUEMART_USER_FORM_ADD_SHIPTO_LBL';
	}
	if (($_ordcnt = count($this->orderlist)) > 0) {
		$tabarray['orderlist'] = 'COM_VIRTUEMART_YOUR_ORDERS';
	}

	shopFunctionsF::buildTabs ( $this, $tabarray);

} else {
	echo $this->loadTemplate ( 'shopper' );
}

// captcha addition
if(VmConfig::get ('reg_captcha')){
	JHTML::_('behavior.framework');
	JPluginHelper::importPlugin('captcha');
	$dispatcher = JDispatcher::getInstance(); $dispatcher->trigger('onInit','dynamic_recaptcha_1');
	?>
	<div id="dynamic_recaptcha_1"></div>
	<?php
}
// end of captcha addition
?>
<input type="hidden" name="option" value="com_virtuemart" />
<input type="hidden" name="controller" value="user" />
<?php echo JHtml::_( 'form.token' ); ?>
<?php if($this->userDetails->user_is_vendor){ ?>
<div class="buttonBar">
	<button class="button submit-btn" type="submit" onclick="javascript:return myValidator(userForm, 'saveUser');" ><?php echo $this->button_lbl ?></button>
	&nbsp;
	<button class="button reset-btn" type="reset" onclick="window.location.href='<?php echo JRoute::_('index.php?option=com_virtuemart&view=user&task=cancel', FALSE); ?>'" ><?php echo vmText::_('COM_VIRTUEMART_CANCEL'); ?></button>
</div>
<?php } ?>
</form>

