
// var host = 'http://localhost/code';
var host = "https://solmyr.se/easyreply/";

$(document).ready(function () {
  $("head").append(
    "<style>\
			.EasyReplyBtn {\
			  margin-left: 20px;\
			  cursor: pointer;\
			  background-color: #4CAF50;\
			  border: none;\
			  color: white;\
			  padding: 8px 15px;\
			  text-align: center;\
			  text-decoration: none;\
			  display: inline-block;\
			  font-size: 16px;\
			}\
			.EasyReplyBtn:hover\
			{\
			  opacity: 0.75;\
			}\
			.EasyReplyBtn2 {\
			  margin-left: 20px;\
			  cursor: pointer;\
			  background-color: #4CAF50;\
			  border: none;\
			  color: white;\
			  padding: 8px 15px;\
			  text-align: center;\
			  text-decoration: none;\
			  display: inline-block;\
			  font-size: 16px;\
			}\
			.EasyReplyBtn2:hover\
			{\
			  opacity: 0.75;\
			}\
			</style>"
  );

  $(document).on("click", "*", function () {
    $("body").find(".EasyReply").remove();
  });

  $(document).on("click", "#finishSMTPAuth", function () {
    window.location.reload();
  });

  setInterval(function () {
    var i = 0;

    $(document)
      .find('[aria-label="New Message"]')
      .each(function () {
        var element = $(this);

        if (!element.find(".EasyReply-" + i).length) {
          console.log(element);
          element.append(
            '<div style="position: absolute; bottom: 14px; right: 40px; z-index: 999999;" id="EasyReply-container-' +
              i +
              '">\
	    					<button type="button" class="EasyReplyBtn EasyReply-' +
              i +
              '" attr-id="' +
              i +
              '" style="font-weight: bold;">ER</button>\
	    					</div>'
          );
        }
      });
  }, 500);

  $(document).on("click", ".EasyReplyBtn", function () {
    var from = $("body").find('span[name="me"]').attr("email");
    var own = document.title;
    own = own.split("-");
    own = own[1].trim();
    var cc = $("body").find('span[class="yP"]').attr("email");
    var bcc = $("span").attr("aria-label");
    // console.log(cc, bcc);
    var id = $(this).attr("attr-id");
    var send_container = $(".EasyReply-" + id)
      .parent()
      .parent();
    var message = send_container
      .find(".editable")
      .html()
      .replace(/[^\x20-\x7E]/g, "");
    var emails = [];
    var subject = send_container.find('[name="subjectbox"]').val();

    send_container.find("[email]").each(function () {
      emails.push($(this).attr("email"));
    });
    // console.log(send_container.find('[name="subjectbox"]'));
    $.post(host + "/popup.php", {
      subject: subject,
      message: btoa(message),
      emails: JSON.stringify(emails),
      from: own,
    }).done(function (data) {
      $("body").append(data);
    });
  });

  $(document).on("click", "[EasyReply-more]", function () {
    $(".EasyReply_answers").append(
      '<input type="text" name="answer[]" placeholder="Answer" value="" autocomplete="off">'
    );
  });

  window.onload = function () {
    var from = $("body").find('span[name="me"]').attr("email");
    $("body").append(
      '<a href="' +
        host +
        "/emails.php?hash=" +
        btoa(from) +
        '" class="EasyReplyBtn" style="font-weight: bold; position: fixed; top: 15px; right: 250px; cursor: pointer; z-index: 9999;">Q&A</a>'
    );
  };
});
