function calculateCompoundInterest(principal, rate, time) {

	const n = 1;
  
	const compoundInterest = principal * Math.pow(1 + rate / (n * 100), n * time) - principal;
  
	return compoundInterest;

}



function plans_handler(){

	

	var is_battery = $('.is_battery').prop("checked");
	var is_battery_added = false
	

	$('.plan:checked').closest('.plan-type').css('border', '5px solid green');
	$('.num-of-pannels:checked').closest('.plan-type').css('border', '5px solid green');

	$('.plan:not(:checked)').closest('.plan-type').css('border', '5px solid grey');
	$('.num-of-pannels:not(:checked)').closest('.plan-type').css('border', '5px solid grey');


	var plan_type = $('.plan:checked').attr( "id" );  
	var num_of_pannels = $('.num-of-pannels:checked').attr( "id" );

	if(plan_type === 'standard'){
		if(is_battery){
			var total = (num_of_pannels * 3000) + 1000;
			is_battery_added = true
			$('.is_battery_added').val(is_battery_added)
		}else{
			var total = num_of_pannels * 3000;
		}
		$('.price').text("₹ " + total);
		var kwh = 385 * num_of_pannels;
		$('.kwh-text').text(kwh + " " +"KWH");
		$('.plan--quantity').text(num_of_pannels + "X " + plan_type)
 	}
	else if( plan_type === 'premium' ){

		if(is_battery){
			var total = (num_of_pannels * 4000) + 1000
			is_battery_added = true
			$('.is_battery_added').val(is_battery_added)
		}else{
			var total = num_of_pannels * 4000;
		}

		$('.price').text("₹ " + total);
		var kwh = 405 * num_of_pannels;
		$('.kwh-text').text(kwh + " " +"KWH");
		$('.plan--quantity').text(num_of_pannels + " X " + plan_type)
	}
	else if( plan_type === 'performance' ){

		if(is_battery){
			var total = (num_of_pannels * 5000) + 1000
			is_battery_added = true
			$('.is_battery_added').val(is_battery_added)
		}else{
			var total = num_of_pannels * 5000;
		}

		$('.price').text("₹ " + total);
		var kwh = 430 * num_of_pannels;
		$('.kwh-text').text(kwh + " " +"KWH");
		$('.plan--quantity').text(num_of_pannels + " X " + plan_type+"+")
	}

	

}


function savings_calulator(){
	var month_expense = $('.bill-amount-selector').val();
	$(".month-val").val(month_expense)
	month_expense = $(".month-val").val();

	var min_saving = 0 ;
	var max_saving = 0 ;

	var plan_type = $('.plan:checked').attr( "id" );

	if(plan_type === 'standard'){

		min_saving = month_expense * 0.7;
		max_saving = month_expense  * 0.90;

	}else if(plan_type === 'premium'){

		min_saving = month_expense * 0.8;
		max_saving = month_expense  * 0.90;

	}else if(plan_type === 'performance'){

		min_saving = month_expense * 0.9;
		max_saving = month_expense  * 1;

	}

 	min_saving = Math.round(min_saving)
	max_saving = Math.round(max_saving)

	if (!(max_saving > 60000) && !(min_saving > 60000)) {
		$('.monthly-savings-text').text("₹ " + min_saving + " - ₹ " + max_saving);
	}
	
	var total_int = calculateCompoundInterest(month_expense , 4, 25)

	var net_expense_of_years = (month_expense*12) * 25 + total_int 

	net_expense_of_years = Math.round(net_expense_of_years)
	var additional_pecrent_val = Math.round(net_expense_of_years* 0.3) ;
	$('.month-bill-txt').text( "₹ " + month_expense);
	$(".calculated-vals").text("₹" + net_expense_of_years + " - " + "₹" + (additional_pecrent_val+net_expense_of_years) );
	
}


$(document).ready(function () {


	plans_handler()
	savings_calulator()
	$('.plan,.number-of-pannels').click(function(){

		plans_handler()

		var min_saving = 0 ;
		var max_saving = 0 ;

		var plan_type = $('.plan:checked').attr( "id" );
		var month_expense = $(".month-val").val();
		if(plan_type === 'standard'){
	
			min_saving = month_expense * 0.7;
			max_saving = month_expense  * 0.90;
	
		}else if(plan_type === 'premium'){
	
			min_saving = month_expense * 0.8;
			max_saving = month_expense  * 0.90;
	
		}else if(plan_type === 'performance'){
	
			min_saving = month_expense * 0.9;
			max_saving = month_expense  * 1;
	
		}
	
		min_saving = Math.round(min_saving)
		max_saving = Math.round(max_saving)

		if (!(max_saving > 60000) && !(min_saving > 60000)) {
			$('.monthly-savings-text').text("₹ " + min_saving + " - ₹ " + max_saving);
		}
		

	});

	$('.is_battery').change(function(){
		plans_handler()
		if ($('.is_battery').prop("checked") == false && $('.is_battery_added').val() == true);
		var current_price = $('.pop-up-price').text().replace(/[\s₹]/g, "");
	});

	$('.bill-amount-selector').change(function(){
		savings_calulator()
	});

	$('.month-val').keyup(function(){
		
		if($('.month-val').val() > 14000){
			$(".bill-amount-selector").val($('.month-val').val());
		}

		month_expense = $(".month-val").val();
		var total_int = calculateCompoundInterest(month_expense , 4, 25)
	
		var net_expense_of_years = (month_expense*12) * 25 + total_int 
	
		net_expense_of_years = Math.round(net_expense_of_years)
		var additional_pecrent_val = Math.round(net_expense_of_years* 0.3);
		$('.month-bill-txt').text( "₹ " + month_expense);
	
		$(".calculated-vals").text("₹" + net_expense_of_years + " - " + "₹" + (additional_pecrent_val+net_expense_of_years) );
		$('.month-bill-txt').text(month_expense)

		var plan_type = $('.plan:checked').attr( "id" );

		if(plan_type === 'standard'){
	
			min_saving = month_expense * 0.7;
			max_saving = month_expense  * 0.90;
	
		}else if(plan_type === 'premium'){
	
			min_saving = month_expense * 0.8;
			max_saving = month_expense  * 0.90;
	
		}else if(plan_type === 'performance'){
	
			min_saving = month_expense * 0.9;
			max_saving = month_expense  * 1;
	
		}
	
		min_saving = Math.round(min_saving)
		max_saving = Math.round(max_saving)
	
		if (!(max_saving > 60000) && !(min_saving > 60000)) {
			$('.monthly-savings-text').text("₹ " + min_saving + " - ₹ " + max_saving);
		}
		
	});
	
	

	$('.solar-popup').click(function () {

		$.magnificPopup.open({
			items: {
				src: '#popup_container'
			},
			type: 'inline'
		});
	})


	$("#closer").click(function () {
		$(".magnific_popup").fadeOut(300);
		$("#popup_container").css("animation-name", "popup_fadeout");
		$("#popup_container").css("animation-duration", ".5s");

	});

});

  