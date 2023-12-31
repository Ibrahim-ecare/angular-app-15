export const InfoAlertMessages: { [key: string]: string; } = {

    'apn_or_tracer_req':'APN or Tracer No. is required.',
    'tracer_req':'Tracer No. is required.',
    'chg_agency':'Changing the Batch Agency Name will change the Agency Name for the entire batch. There are {0} payments that will be changed.<br> Do you want to continue (OK), or keep the previous Agency name (Cancel)?',
    'concur_pay_data':'The data has been updated by {0} and cannot be saved.<br> Retrieve the payment again, then make your changes and save.',
    'confirm_chg_agency':'The new batch agency name will be applied to all payments in the batch.',
    'confirm_dp_to_dpa':'Payment Status for the selected payments will be updated from Double Payment to Double Payment – Auditor.',
    'confirm_dpa_to_dp':'Payment Status for the selected payments will be updated from Double Payment – Auditor to Double Payment.', 
    'confirm_dpa_to_dpr':'Payment Status for the selected payments will be updated from Double Payment – Auditor to Double Payment – Refunded.', 
    'confirm_dpr_to_dpa':'Payment Status for the selected payments will be updated from Double Payment – Refunded to Double Payment – Auditor.', 
    'confirm_pay_chgs':'Payment detail changes were saved.',
    'confirm_reverse':'The correction was saved and the payment(s) will be reversed.',
    'confirm_undo':'The pending correction is cancelled.',
    'confirm_undoRR':'The correction was saved and the rejected reversal will be reversed.',
    'confirm_reapply':'All From Tracers/Installments will be reapplied to the To Tracers/Installments.',
    'cost_lte_tax':'Cost Amount must be less than or equal to Tax Amount.',
    'dates_from_gte_to':'{0} must be greater than or equal to {1}.',
    'dates_from_lt_to':'{0} must be less than {1}.',
    'dates_from_lte_to':'{0} must be less than or equal to {1}.',
    'dates_future_not_allowed':'{0} cannot be a future date.',
    'dates_future7_not_allowed':'{0} cannot be more than 7 days in the future.',
    'dates_invalid_format':'The required date format is: MM/DD/YYYY.',
    'date_lt_current':'{0} must be less than the current date.',
    'date_minus_1_bus_day':'{0} must be a prior business day.',
    'from_total_gte_to_total':'Total Amount for the From Tracer/Installment must be greater than or equal to the Total Amount for the To Tracer/Installment to reapply.',
    'interest_lte_tax':'Interest Amount must be less than or equal to Tax Amount.',
    'invalid_apn':'APN was not found.',
    'invalid_number':'Only numbers can be entered for {0}.',
    'invalid_tracer':'Tracer No. not found.',
    'invalid_tracer_format':'Tracer No must be 8 digits.',
    'min_columns':'At least 6 columns must be selected for display.',
    'no_add_paid_pend':'The Tracer No/Install No cannot be added because the Install Status is {0}.<br> A payment cannot be reapplied if the installment is paid or there is a correction pending.',
    'no_add_no_payment':'The Tracer No/Install No cannot be added because there is no payment associated it.',
    'no_data_found':'No data is available that matches your search criteria.<br/> Please change your search and try again.',
    'no_first_when_2nd_paid':'The second installment for this tracer has already been paid. The first installment payment can not be reapplied.',
    'penalty_lte_tax':'Penalty Amount must be less than or equal to Tax Amount.',
    'pending_correction':'There is a pending correction for the tracer/installment.<br> Undo the pending correction (OK) or wait until it has processed (Cancel).',
    'reapply_from_gte_to':'Total Amount for the From Tracer/Installment must be greater than or equal to the Total Amount for the To Tracer/Installment to reapply.',
    'reapply_paid_error':'The Tracer No/Install No cannot be added because the Install Status is {0}.<br> A payment cannot be reapplied if the installment is paid or there is a correction pending.',
    'required_field':'{0} is required.',
    'install_2nd_paid':'The second installment payment must be reversed before this payment can be reversed.',
    'total_gte_tax':'Total Amount must be greater than or equal to Tax Amount.',
    'too_many_records':'Search results are limited to 3,000 rows. Please change the search criteria to retrieve fewer rows.',
    'unsaved_changes':'Changes have been made without saving.<br> Do you want to proceed without saving the changes (OK), or return to your previous screen (Cancel)?',
    'reapply_not_allowed':'Forwarded/Reverse Return Check-Accepted payments cannot be reapplied',
    'From_Tracer_Once' : 'A Payment for a tracer and installment cannot be added more than once.',
    'To_Tracer_Once' : 'A tracer and installment cannot be added more than once.',
    'server_error':'Internal Server error try after sometime.'
    };
    