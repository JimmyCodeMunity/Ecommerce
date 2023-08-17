<?php
$conn = mysqli_connect('localhost','root','','school');

if($conn){
	echo "connection successful";

}
else{
	echo "connection failed";
}
?>