before activating the environment first check if: Get-ExecutionPolicy
			if output of this command is "Restricted" then to remove it
				a)temporary:Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
				b)permanent:Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser