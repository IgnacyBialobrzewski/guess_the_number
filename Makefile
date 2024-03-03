run:
	templ generate .
	templ fmt .
	gofmt -w .
	go run .
