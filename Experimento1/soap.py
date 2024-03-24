from suds.client import Client

wsdl_url = "http://www.dneonline.com/calculator.asmx?WSDL"

client = Client(wsdl_url)

print("Escolha a operação:")
print("1. Adição")
print("2. Subtração")
print("3. Multiplicação")
print("4. Divisão")
print("5. Todos")

choice = input("Digite o número da operação desejada: ")

if choice not in ['1', '2', '3', '4','5']:
    print("Escolha inválida.")
    exit()

num1 = int(input("Digite o primeiro número: "))
num2 = int(input("Digite o segundo número: "))

if choice == '1':
    result = client.service.Add(intA=num1, intB=num2)
    print("Resultado da adição:", result)
elif choice == '2':
    result = client.service.Subtract(intA=num1, intB=num2)
    print("Resultado da subtração:", result)
elif choice == '3':
    result = client.service.Multiply(intA=num1, intB=num2)
    print("Resultado da multiplicação:", result)
elif choice == '4':
    result = client.service.Divide(intA=num1, intB=num2)
    print("Resultado da divisão:", result)
elif choice == '5':
    result1 = client.service.Add(intA=num1, intB=num2)
    result2 = client.service.Subtract(intA=num1, intB=num2)
    result3 = client.service.Multiply(intA=num1, intB=num2)
    result4 = client.service.Divide(intA=num1, intB=num2)
    print("Resultado da adição:", result1)
    print("Resultado da subtração:", result2)
    print("Resultado da multiplicação:", result3)
    print("Resultado da divisão:", result4)
